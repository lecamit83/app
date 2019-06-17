export function getFromStorage(key){
	if(!key){
		return null;
	}
	try{
		const valueStorage = localStorage.getItem(key);
		if(valueStorage){
			return JSON.parse(valueStorage);
		}
		return null;
	}catch(error){
		return null;
	}
}

export function setInStorage(key, value){
	if(!key){
		console.error('Error : Key is missing');
	}
	try{
		localStorage.setItem(key, JSON.stringify(value));
	}catch(error){
		console.error(error);
	}
}

export function removeStorage(key){
	if(!key){
		console.error('Error : Key is missing');
	}
	try{
		localStorage.removeItem(key);
	} catch(error) {
		console.error(error);
	}
}