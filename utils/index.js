export function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds - (hours * 3600)) / 60);
    let remainingSeconds = seconds % 60;
  
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  }
  // rpx 转换为 px
export function rpxToPx(rpx) {
  return (rpx / 750) * tt.getSystemInfoSync().windowWidth;
}

// px 转换为 rpx
export function pxToRpx(px) {
  return (px * 750) / tt.getSystemInfoSync().windowWidth;
}

export function formatNumberToW(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w';
  } else {
    return num.toString();
  }
}
export function formatNumberToK(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  } else {
    return num.toString();
  }
}
