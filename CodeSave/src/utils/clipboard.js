export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};

export const shareContent = async (title, content) => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: title,
        text: content,
        url: window.location.href
      });
      return true;
    } else {
      // Fallback: copy URL to clipboard
      const url = window.location.href;
      const success = await copyToClipboard(url);
      return success;
    }
  } catch (error) {
    console.error('Failed to share content:', error);
    return false;
  }
};

export const downloadAsFile = (content, filename = 'paste.txt') => {
  try {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Failed to download file:', error);
    return false;
  }
};