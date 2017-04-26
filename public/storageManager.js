(function() {
    var root = this;
    var storage = localStorage;
    
    var getStorageManager = function(){};
    
    getStorageManager.prototype = {
        set:function(key, value, expiry){
            storage.setItem(key, JSON.stringify({value:value, expiry:new Date().getTime() + expiry * 1000}));
        },
        
        get:function(key){
            var item = JSON.parse(storage.getItem(key));
            if(!item){
                return undefined;
            } else if(new Date().getTime() > item.expiry){
                this.remove(key);
                return 'expired';
            } else if(typeof item.value === 'object' || typeof item.value === 'array'|| typeof item.value === 'number'){
                return item.value;
            }
        },
        
        setProperty:function(key, property, value, expiry) {
            var item = JSON.parse(storage.getItem(key));
            
            if(item && item.value){
                if(typeof item.value === 'object'){
                    item.value[property] = value;
                    this.set(key, item.value, expiry);
                } else {
                    throw 'Not object!';
                }
            } else {
                this.set(key, {[property]:value}, expiry);
            }
        },
        
        remove:function(key) {
            storage.removeItem(key);
        }
    };
    
    root.getStorageManager = getStorageManager;

    window.getStorageManager = function () {
        return new getStorageManager();
    }
})();