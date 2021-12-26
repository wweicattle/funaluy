export function format(num, len=2) {
  num=Number(num)
    if (len != undefined) {
      return `${(num * 1).toFixed(len)}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    } else {
      return `${(num * 1).toFixed(2)}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    }
}