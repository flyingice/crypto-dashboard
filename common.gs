const PARAMS = {
  method: 'GET',
  headers: { 'X-CMC_PRO_API_KEY': '' }, // api key here
};

const SHEET_PORTFOLIO = 'Portfolio';  // main driven table
const SHEET_PORTFOLIOHISTORY = 'PortfolioHistory';
const SHEET_IDMAP = 'IdMap';

// structure of the main driven table
const ROW_TITLE = 1;
const ROW_DATA = 2;
const COLUMN_SYMBOL = 5;
const COLUMN_ID = COLUMN_SYMBOL - 1;
const COLUMN_AMOUNT = COLUMN_SYMBOL - 2;
const COLUMN_QUOTE = COLUMN_SYMBOL - 3;
const COLUMN_POSITION = COLUMN_SYMBOL - 4;
