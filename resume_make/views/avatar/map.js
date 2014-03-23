function(doc){
	if('_attachment' in doc){
		emit(null, doc);
	}
}