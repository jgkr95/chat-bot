
export const BASE_URL = 'http://localhost:4000/'

export function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}


export const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 10);
  };