// src/utils/date.js
export function normalizeDate(dateInput) {
  if (!dateInput) return new Date();
  
  // 如果是字符串，尝试解析
  if (typeof dateInput === 'string') {
    // 移除字符串两端的引号
    const cleanDateStr = dateInput.replace(/^["']|["']$/g, '');
    const date = new Date(cleanDateStr);
    
    // 如果解析失败，返回当前日期
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${dateInput}, falling back to current date`);
      return new Date();
    }
    return date;
  }
  
  // 如果是 Date 对象，直接返回
  if (dateInput instanceof Date) {
    return dateInput;
  }
  
  // 如果是数字时间戳
  if (typeof dateInput === 'number') {
    return new Date(dateInput);
  }
  
  // 其他情况返回当前日期
  console.warn(`Unsupported date format: ${typeof dateInput}`, dateInput);
  return new Date();
}

export function formatDate(date, locale = 'zh-CN', options = {}) {
  const normalizedDate = normalizeDate(date);
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  return normalizedDate.toLocaleDateString(locale, { ...defaultOptions, ...options });
}