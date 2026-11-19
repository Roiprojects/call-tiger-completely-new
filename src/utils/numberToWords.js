/**
 * INDIAN NUMBER TO WORDS CONVERTER
 * Converts numbers into Indian numbering system words (Crores, Lakhs, Thousands)
 * Used across Commercial Building, Sites, and Property Cards (Pages 7 & 8)
 */

const UNITS = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

function convertTwoDigits(num) {
  if (num === 0) return '';
  if (num < 20) return UNITS[num];
  const tens = Math.floor(num / 10);
  const ones = num % 10;
  return TENS[tens] + (ones ? ' ' + UNITS[ones] : '');
}

function convertThreeDigits(num) {
  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;
  let str = '';
  if (hundreds > 0) {
    str += UNITS[hundreds] + ' Hundred';
  }
  if (remainder > 0) {
    str += (hundreds > 0 ? ' ' : '') + convertTwoDigits(remainder);
  }
  return str;
}

/**
 * Converts a numeric value into full Indian English words
 * Example: 120000 -> "One Lakh Twenty Thousand"
 * Example: 120000000 -> "Twelve Crore"
 */
export function numberToIndianWords(value) {
  if (value === null || value === undefined || value === '') return '';
  const num = Math.round(Number(value));
  if (isNaN(num) || num < 0) return '';
  if (num === 0) return 'Zero';

  let remaining = num;
  let result = [];

  // Crores (>= 1,00,00,000)
  if (remaining >= 10000000) {
    const crores = Math.floor(remaining / 10000000);
    remaining = remaining % 10000000;
    if (crores >= 100) {
      result.push(convertThreeDigits(crores) + ' Crore');
    } else {
      result.push(convertTwoDigits(crores) + ' Crore');
    }
  }

  // Lakhs (>= 1,00,000)
  if (remaining >= 100000) {
    const lakhs = Math.floor(remaining / 100000);
    remaining = remaining % 100000;
    result.push(convertTwoDigits(lakhs) + ' Lakh');
  }

  // Thousands (>= 1,000)
  if (remaining >= 1000) {
    const thousands = Math.floor(remaining / 1000);
    remaining = remaining % 1000;
    result.push(convertTwoDigits(thousands) + ' Thousand');
  }

  // Hundreds & units (< 1,000)
  if (remaining > 0) {
    result.push(convertThreeDigits(remaining));
  }

  return result.join(' ') + ' Only';
}

/**
 * Formats a raw number into Indian comma separated string (e.g. 1,20,00,000)
 */
export function formatIndianCurrencyNumber(num) {
  if (num === null || num === undefined || num === '') return '—';
  const val = Number(num);
  if (isNaN(val)) return String(num);
  return '₹ ' + val.toLocaleString('en-IN');
}

/**
 * Helper to display both numeric and text word format as requested in wireframe Pages 7 & 8:
 * "Convert it to text format [✓] Ex:- Twelve crore only. Both should appear on web site"
 */
export function formatPriceWithWords(amountInCr) {
  const val = parseFloat(amountInCr);
  if (isNaN(val) || val <= 0) return { short: 'Price on Request', words: '' };
  const rawRupees = Math.round(val * 10000000);
  const words = numberToIndianWords(rawRupees);
  const short = `₹ ${val % 1 === 0 ? val.toFixed(0) : val.toFixed(2).replace(/0$/, '')} Cr`;
  return {
    short,
    words,
    fullFormatted: `${short} (${words})`
  };
}
