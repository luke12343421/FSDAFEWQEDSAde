var data = {}
data.api = {
    hypixel: {
        enchant: 160,
        specisal: {
            carrotegoldench: (nombre) => {
                var enchant = data.api.hypixel.enchant
                var cacul1 = (enchant * 128) * nombre  // carrote require  
                var cacul2 = nombre * 9 * 32  // gold require 
                console.log(cacul2)
            }
        }
    }
}
data.api.hypixel.specisal.carrotegoldench(1)
