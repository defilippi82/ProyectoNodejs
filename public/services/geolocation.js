

async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  } 
  
  module.exports = {
    getCurrentPosition
  }