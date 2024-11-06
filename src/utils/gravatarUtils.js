// Function to get SHA-256 hash in hexadecimal format
const getHashHex = async (str) => {
    const msgBuffer = new TextEncoder().encode(str.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };
  
  // Function to get Gravatar URL
  export const getGravatarUrl = async (email) => {
    try {
      const hashHex = await getHashHex(email);
      return `https://www.gravatar.com/avatar/${hashHex}?d=mp`;
    } catch (error) {
      console.error('Error generating Gravatar URL:', error);
      return `https://www.gravatar.com/avatar/default?d=mp`;
    }
  };
  