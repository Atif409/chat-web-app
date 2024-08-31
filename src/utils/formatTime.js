// utils/formatTime.js

export function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Convert to 12-hour format
    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM/PM
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Pad minutes with leading zero if needed
    
    const ampm = isPM ? 'PM' : 'AM';
    
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  