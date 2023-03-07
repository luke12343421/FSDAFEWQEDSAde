var data = {
    function: {
        formatNumberWithSuffix: (number) => {
            if (number < 1000) {
                return number.toString();
            }
            if (number >= 1000 && number < 1000000) {
                return (number / 1000).toFixed(1) + "k";
            }
            if (number >= 1000000 && number < 1000000000) {
                return (number / 1000000).toFixed(1) + "m";
            }
            if (number >= 1000000000) {
                return (number / 1000000000).toFixed(1) + "b";
            }
        }
    }
}

data.api = {
    hypixel: {
        enchant: 160,
        function: {
            cacul: (_1) => {
                try {
                    if(data.api.hypixel.specisal[`${_1.demande}`] !== undefined) return  data.api.hypixel.specisal[`${_1.demande}`](_1.nombre, _1.prefix)
                } catch (error) {
                    
                }
                const première_cacul = (160) * _1.nombre;
                var caculstack = `${_1.name} no-stack: ${première_cacul}\n${_1.name} stack: ${(première_cacul / 64).toFixed(0)}`
                return caculstack;
            }
        },
        specisal: {
            CarroteGold: (nombre, all = true) => {
                if (nombre == 0) nombre = 1;
                const enchant = data.api.hypixel.enchant
                const requiregold = 1;
                var cacul1 = (enchant * 128) * nombre  // carrote require  
                var cacul2 = ((32 * nombre) - ((32 * nombre) / 9))  // gold require
                cacul2 = cacul2.toFixed(1) * 1
                for (let i = 0; i < 9; i++) {
                    if (cacul2.toString().includes(`.${i}`)) {
                        cacul2 = cacul2.toFixed(0) * 1
                        cacul2 += 1
                    }
                }
                if (cacul2.toString().includes(`.`)) cacul2 = cacul2.toFixed(0) * 1;
                cacul1 = (cacul1 + cacul2).toFixed(0) * 1
                var cacul3 = cacul2 * 9 // gold negget
                var cacul4 = 128 * nombre // carrote enchante require
                var caculstack = `Carrote no-stack: ${cacul1}\nCarrote stack: ${(cacul1 / 64).toFixed(0)}\nCarrote enchante stack: ${cacul4 / 64}${(cacul2 / 64).toFixed(0) * 1 == 0 ? `\nGold no-stack: ${cacul2}` : `\nGold stack: ${(cacul2 / 64).toFixed(0)}`}\nGold negget stack: ${(cacul3 / 64).toFixed(0)}`
                if (all == true) {
                    var caculstack = `Carrote no-stack: ${data.function.formatNumberWithSuffix(cacul1)}\nCarrote stack: ${data.function.formatNumberWithSuffix((cacul1 / 64).toFixed(0))}\nCarrote enchante stack: ${data.function.formatNumberWithSuffix(cacul4 / 64)}${data.function.formatNumberWithSuffix(cacul2 / 64) == "0" ? `\nGold no-stack: ${data.function.formatNumberWithSuffix(cacul2)}` : `\nGold stack: ${data.function.formatNumberWithSuffix((cacul2 / 64).toFixed(0))}`}\nGold negget stack: ${data.function.formatNumberWithSuffix((cacul3 / 64).toFixed(0))}`
                }
                return caculstack
            }
        
        }
            
    }
}
console.log(data.api.hypixel.function.cacul({ nombre: 1, name: `Carrote`, prefix: false, demande: "CarrotejGold" }))
