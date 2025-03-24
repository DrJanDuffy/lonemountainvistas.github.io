import { config } from './config.js';

async function testPexelsAPI() {
    try {
        const response = await fetch(
            `${config.PEXELS_API_URL}/search?query=mountain+landscape+nevada&per_page=1`,
            {
                headers: {
                    'Authorization': config.PEXELS_API_KEY,
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Pexels API Response:', data);

        if (data.photos && data.photos.length > 0) {
            const photo = data.photos[0];
            console.log('Image URL:', photo.src.large);
            return photo.src.large;
        } else {
            console.error('No photos found in response');
            return null;
        }
    } catch (error) {
        console.error('Error testing Pexels API:', error);
        return null;
    }
}

// Run the test
testPexelsAPI(); 