// =====================================================
// LoopedWithLove — Google Apps Script API
// Version: 1.0.0
// Attach to your Google Sheet, deploy as Web App
// =====================================================

const SHEET_PRODUCTS = 'Products';
const SHEET_CATEGORIES = 'Categories';
const SHEET_SETTINGS = 'Settings';
const API_KEY_PROP = 'APPS_SCRIPT_API_KEY';

const COL = {
  ID:0,TIMESTAMP:1,NAME:2,SLUG:3,CATEGORY:4,SHORT_DESC:5,DESCRIPTION:6,
  PRICE:7,MRP:8,IMAGE1:9,IMAGE2:10,IMAGE3:11,IMAGE4:12,IMAGE5:13,IMAGE6:14,
  LINK_AMAZON:15,LINK_FLIPKART:16,LINK_MEESHO:17,LINK_ETSY:18,LINK_INSTAGRAM:19,
  LINK_OTHER_NAME:20,LINK_OTHER_URL:21,STOCK_STATUS:22,QUANTITY:23,
  IS_BESTSELLER:24,IS_FEATURED:25,IS_VISIBLE:26,MATERIAL:27,DIMENSIONS:28,
  CARE_INSTRUCTIONS:29,TAGS:30
};

function doGet(e) {
  try {
    const action = e.parameter.action || '';
    let result;
    switch (action) {
      case 'getProducts': result = getProducts(); break;
      case 'getProduct': result = getProductBySlug(e.parameter.slug); break;
      case 'getFeatured': result = getFeaturedProducts(); break;
      case 'getBestsellers': result = getBestsellerProducts(); break;
      case 'getCategories': result = getCategories(); break;
      case 'getSettings': result = getSettings(); break;
      default: result = { error: 'Unknown action: ' + action };
    }
    return buildResponse(result);
  } catch (err) { return buildResponse({ error: err.toString() }); }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const apiKey = body.apiKey || e.parameter.apiKey || '';
    const storedKey = PropertiesService.getScriptProperties().getProperty(API_KEY_PROP);
    if (!storedKey || apiKey !== storedKey)
      return buildResponse({ error: 'Unauthorized: Invalid API key' }, 401);
    const action = body.action || '';
    let result;
    switch (action) {
      case 'updateProduct': result = updateProductField(body.id, body.field, body.value); break;
      default: result = { error: 'Unknown POST action: ' + action };
    }
    return buildResponse(result);
  } catch (err) { return buildResponse({ error: err.toString() }); }
}

function getProducts() {
  const sheet = getSheet(SHEET_PRODUCTS);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  return data.slice(1).filter(r => r[COL.ID] && r[COL.NAME]).map(rowToProduct).filter(p => p.is_visible === true);
}

function getProductBySlug(slug) {
  if (!slug) return null;
  return getProducts().find(p => p.slug === slug) || null;
}

function getFeaturedProducts() { return getProducts().filter(p => p.is_featured === true); }
function getBestsellerProducts() { return getProducts().filter(p => p.is_bestseller === true); }

function getCategories() {
  const sheet = getSheet(SHEET_CATEGORIES);
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  return data.slice(1).filter(r => r[0]).map(r => ({
    category_name: r[0]||'', category_slug: r[1]||'', category_description: r[2]||'',
    category_image: r[3]||'', display_order: parseInt(r[4])||0, is_active: parseBool(r[5])
  })).filter(c => c.is_active).sort((a,b) => a.display_order - b.display_order);
}

function getSettings() {
  const sheet = getSheet(SHEET_SETTINGS);
  if (!sheet) return {};
  const settings = {};
  sheet.getDataRange().getValues().forEach(row => {
    if (row[0] && row[1] !== undefined) {
      const key = row[0].toString().replace(/_([a-z])/g, (_, c) => c.toUpperCase());
      settings[key] = row[1].toString();
    }
  });
  return settings;
}

function updateProductField(id, field, value) {
  if (!id || !field) return { success: false, message: 'Missing id or field' };
  const sheet = getSheet(SHEET_PRODUCTS);
  if (!sheet) return { success: false, message: 'Products sheet not found' };
  const data = sheet.getDataRange().getValues();
  const rowIndex = data.findIndex((row, i) => i > 0 && row[COL.ID] === id);
  if (rowIndex === -1) return { success: false, message: `Product ${id} not found` };
  const fieldToCol = { stock_status: COL.STOCK_STATUS, quantity: COL.QUANTITY, is_bestseller: COL.IS_BESTSELLER, is_featured: COL.IS_FEATURED, is_visible: COL.IS_VISIBLE };
  const colIndex = fieldToCol[field];
  if (colIndex === undefined) return { success: false, message: `Invalid field: ${field}` };
  let finalValue = value;
  if (field === 'quantity') finalValue = parseInt(value) || 0;
  else if (['is_bestseller','is_featured','is_visible'].includes(field)) finalValue = (value === true || value === 'true' || value === 'TRUE');
  sheet.getRange(rowIndex + 1, colIndex + 1).setValue(finalValue);
  return { success: true, message: `Updated ${field} for product ${id}`, newValue: finalValue };
}

function rowToProduct(row) {
  return {
    id: String(row[COL.ID]||''), timestamp: row[COL.TIMESTAMP] instanceof Date ? row[COL.TIMESTAMP].toISOString() : String(row[COL.TIMESTAMP]||new Date().toISOString()),
    name: String(row[COL.NAME]||''), slug: String(row[COL.SLUG]||''), category: String(row[COL.CATEGORY]||''),
    short_description: String(row[COL.SHORT_DESC]||''), description: String(row[COL.DESCRIPTION]||''),
    price: parseFloat(row[COL.PRICE])||0, mrp: row[COL.MRP] ? parseFloat(row[COL.MRP]) : null,
    image1: convertDriveUrl(String(row[COL.IMAGE1]||'')), image2: convertDriveUrl(String(row[COL.IMAGE2]||'')),
    image3: convertDriveUrl(String(row[COL.IMAGE3]||'')), image4: convertDriveUrl(String(row[COL.IMAGE4]||'')),
    image5: convertDriveUrl(String(row[COL.IMAGE5]||'')), image6: convertDriveUrl(String(row[COL.IMAGE6]||'')),
    link_amazon: String(row[COL.LINK_AMAZON]||''), link_flipkart: String(row[COL.LINK_FLIPKART]||''),
    link_meesho: String(row[COL.LINK_MEESHO]||''), link_etsy: String(row[COL.LINK_ETSY]||''),
    link_instagram: String(row[COL.LINK_INSTAGRAM]||''), link_other_name: String(row[COL.LINK_OTHER_NAME]||''),
    link_other_url: String(row[COL.LINK_OTHER_URL]||''), stock_status: String(row[COL.STOCK_STATUS]||'In Stock'),
    quantity: (row[COL.QUANTITY]!==''&&row[COL.QUANTITY]!==null) ? parseInt(row[COL.QUANTITY]) : null,
    is_bestseller: parseBool(row[COL.IS_BESTSELLER]), is_featured: parseBool(row[COL.IS_FEATURED]),
    is_visible: row[COL.IS_VISIBLE]==='' ? true : parseBool(row[COL.IS_VISIBLE]),
    material: String(row[COL.MATERIAL]||''), dimensions: String(row[COL.DIMENSIONS]||''),
    care_instructions: String(row[COL.CARE_INSTRUCTIONS]||''), tags: String(row[COL.TAGS]||'')
  };
}

function parseBool(v) {
  if (typeof v === 'boolean') return v;
  if (typeof v === 'string') return v.toUpperCase()==='TRUE'||v==='1'||v.toLowerCase()==='yes';
  return Boolean(v);
}

function convertDriveUrl(url) {
  if (!url || !url.includes('drive.google.com')) return url;
  const patterns = [/https:\/\/drive\.google\.com\/file\/d\/([^/]+)\/view/,/https:\/\/drive\.google\.com\/open\?id=([^&]+)/,/https:\/\/drive\.google\.com\/uc\?(?:export=[^&]+&)?id=([^&]+)/];
  for (const p of patterns) { const m = url.match(p); if (m) return `https://drive.google.com/uc?export=view&id=${m[1]}`; }
  return url;
}

function getSheet(name) { return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name); }

function buildResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// =====================================================
// SETUP FUNCTIONS — Run each once in order
// =====================================================

/** STEP 1: Edit the API key below, then run this function */
function setupApiKey() {
  const apiKey = 'change-this-to-a-strong-random-key-123'; // CHANGE THIS FIRST!
  PropertiesService.getScriptProperties().setProperty(API_KEY_PROP, apiKey);
  Logger.log('✅ API key stored: ' + apiKey);
}

/** STEP 2: Run this to create all sheets with headers and default data */
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Products sheet
  let ps = ss.getSheetByName(SHEET_PRODUCTS) || ss.insertSheet(SHEET_PRODUCTS);
  const ph = ['id','timestamp','name','slug','category','short_description','description','price','mrp','image1','image2','image3','image4','image5','image6','link_amazon','link_flipkart','link_meesho','link_etsy','link_instagram','link_other_name','link_other_url','stock_status','quantity','is_bestseller','is_featured','is_visible','material','dimensions','care_instructions','tags'];
  ps.getRange(1,1,1,ph.length).setValues([ph]).setBackground('#E8A0BF').setFontWeight('bold').setFontColor('#FFFFFF');
  ps.setFrozenRows(1);

  // Categories sheet
  let cs = ss.getSheetByName(SHEET_CATEGORIES) || ss.insertSheet(SHEET_CATEGORIES);
  cs.getRange(1,1,1,6).setValues([['category_name','category_slug','category_description','category_image','display_order','is_active']]).setBackground('#BA90C6').setFontWeight('bold').setFontColor('#FFFFFF');
  const cats = [['Crochet Bouquets & Flowers','bouquets-flowers','Eternal blooms that never wilt','',1,'TRUE'],['Keychains & Bag Charms','keychains-charms','Tiny treasures for every bag','',2,'TRUE'],['Earrings & Jewelry','earrings-jewelry','Handcrafted to adorn','',3,'TRUE'],['Gift Hampers & Combos','gift-hampers','Curated with love','',4,'TRUE'],['Amigurumi (Stuffed Toys)','amigurumi','Adorable crocheted companions','',5,'TRUE'],['Home Décor','home-decor','Coasters, wall art & more','',6,'TRUE'],['Bookmarks & Accessories','bookmarks','Mark your story in style','',7,'TRUE'],['Wearables','wearables','Scrunchies, headbands & more','',8,'TRUE']];
  cs.getRange(2,1,cats.length,6).setValues(cats);

  // Settings sheet
  let sets = ss.getSheetByName(SHEET_SETTINGS) || ss.insertSheet(SHEET_SETTINGS);
  sets.getRange(1,1,1,2).setValues([['setting_name','value']]).setBackground('#C0DBEA').setFontWeight('bold');
  const defs = [['brand_name','LoopedWithLove'],['tagline','Handmade with Love, One Stitch at a Time'],['whatsapp_number','919999999999'],['instagram_url','https://instagram.com/loopedwithlove'],['facebook_url',''],['youtube_url',''],['email','hello@loopedwithlove.in'],['announcement_text','🎉 Free shipping on orders above ₹499! Use code HANDMADE10 for 10% off.'],['hero_image_url','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=90']];
  sets.getRange(2,1,defs.length,2).setValues(defs);

  SpreadsheetApp.getUi().alert('✅ Setup complete! All sheets created.');
}

/** STEP 3: Run this to install the form submit trigger */
function installTrigger() {
  ScriptApp.getProjectTriggers().filter(t=>t.getHandlerFunction()==='onFormSubmit').forEach(t=>ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('onFormSubmit').forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet()).onFormSubmit().create();
  Logger.log('✅ Form submit trigger installed!');
}

/** Auto-runs when Google Form is submitted — generates ID and slug */
function onFormSubmit(e) {
  try {
    const sheet = getSheet(SHEET_PRODUCTS);
    if (!sheet) return;
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;
    const row = sheet.getRange(lastRow,1,1,sheet.getLastColumn()).getValues()[0];
    if (!row[COL.ID]) sheet.getRange(lastRow,COL.ID+1).setValue('prod_'+Date.now().toString(36)+'_'+Math.random().toString(36).substr(2,5));
    if (!row[COL.SLUG]&&row[COL.NAME]) sheet.getRange(lastRow,COL.SLUG+1).setValue(row[COL.NAME].toString().toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').trim());
    if (!row[COL.IS_VISIBLE]) sheet.getRange(lastRow,COL.IS_VISIBLE+1).setValue('TRUE');
    if (!row[COL.STOCK_STATUS]) sheet.getRange(lastRow,COL.STOCK_STATUS+1).setValue('In Stock');
  } catch(err) { Logger.log('onFormSubmit error: '+err); }
}

/** Test function — run to verify your setup works */
function testGetProducts() {
  const products = getProducts();
  Logger.log('Total visible products: ' + products.length);
  if (products.length > 0) Logger.log('First: ' + JSON.stringify(products[0]));
}
