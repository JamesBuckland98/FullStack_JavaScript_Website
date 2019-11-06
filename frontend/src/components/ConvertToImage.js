
/**
 * 
 * @param BufferArray bufferArray
 * @param Function callback
 */
function ConvertToImage (bufferArray, callback) {
	let base64String = btoa(String.fromCharCode(...new Uint8Array(bufferArray)));
	callback(null, 'data:image/jpeg;base64,' + base64String);
}

export default ConvertToImage