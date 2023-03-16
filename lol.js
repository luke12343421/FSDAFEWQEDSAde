const data = {
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
    },
    api: {
        hypixel: {
            enchant: 160,
            function: {
                cacul: (_1) => {
                    if (data.api.hypixel.specisal[`${_1.demande}`] !== undefined) {
                        return data.api.hypixel.specisal[`${_1.demande}`](_1.nombre, _1.prefix)
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
}



const fformatNumberWithSuffix = (() => {
    const memo = new Map();
    return (number) => {
        if (memo.has(number)) {
            return memo.get(number);
        }
        let result;
        if (number < 1000) {
            result = number.toString();
        } else if (number < 1000000) {
            result = (number / 1000).toFixed(1) + "k";
        } else if (number < 1000000000) {
            result = (number / 1000000).toFixed(1) + "m";
        } else {
            result = (number / 1000000000).toFixed(1) + "b";
        }
        memo.set(number, result);
        return result;
    };
})();

const hypixel = {
    enchant: 160,
    calculate: ({ demande, nombre, prefix, name, debug }) => {
        const specialCalculation = hypixel.special[demande];
        if (specialCalculation) {
            return specialCalculation(nombre, prefix, debug);
        }
        const totalEnchants = hypixel.enchant * nombre;
        const stacks = Math.ceil(totalEnchants / 64);
        const result = `${name} no-stack: ${totalEnchants}\n${name} stack: ${stacks}`;

        return debug ? [demande, nombre, prefix, name, debug, result] : result;
    },
    special: {
        CarroteGold: (nombre, all = true, debug) => {
            if (nombre === 0) nombre = 1;
            const enchant = hypixel.enchant;
            const carroteCalculation = (enchant * 128) * nombre;
            let goldCalculation = ((32 * nombre) - ((32 * nombre) / 9));
            goldCalculation = Math.round(goldCalculation * 10) / 10;
            goldCalculation = Math.ceil(goldCalculation);
            const neggetCalculation = goldCalculation * 9;
            const enchantCarroteCalculation = 128 * nombre;
            let result = `Carrote no-stack: ${carroteCalculation}\nCarrote stack: ${(carroteCalculation / 64) | 0}\nCarrote enchante stack: ${enchantCarroteCalculation / 64}`;
            if (goldCalculation <= 64) {
                result += `\nGold no-stack: ${goldCalculation}`;
            } else {
                result += `\nGold no-stack: ${goldCalculation}`;
                result += `\nGold stack: ${(goldCalculation / 64) | 0}`;
            }
            result += `\nGold negget stack: ${(neggetCalculation / 64) | 0}`;
            if (all) {
                result = `Carrote no-stack: ${fformatNumberWithSuffix(carroteCalculation)}\nCarrote stack: ${fformatNumberWithSuffix((carroteCalculation / 64) | 0)}\nCarrote enchante stack: ${fformatNumberWithSuffix(enchantCarroteCalculation / 64)}`;
                if (goldCalculation <= 64) {
                    result += `\nGold no-stack: ${fformatNumberWithSuffix(goldCalculation)}`;
                } else {
                    result += `\nGold no-stack: ${fformatNumberWithSuffix(goldCalculation)}`;
                    result += `\nGold stack: ${fformatNumberWithSuffix((goldCalculation / 64) | 0)}`;
                }
                result += `\nGold negget stack: ${fformatNumberWithSuffix((neggetCalculation / 64) | 0)}`;
            }
            return result;
        }
    },
};

function StartCode(port, name, demande, prefixBoolen, nombre, debug) {
    const server = {
        ping: "500ms",
        port: 25565 | port,
        config: {
            demande: demande,
            nombre: nombre,
            prefix: prefixBoolen,
            name: name,
            debug: debug
        }
    };

    return hypixel.calculate(server.config);
}

//console.log(StartCode(3, null, "CarroteGold", false, 1, false));


console.log(window.FileList)
/*
const nbTests = 100000000;
const promises = [];
// Mesurer le temps d'exécution de la fonction originale

//console.log(hypixel.cacul({ demande: "dd", nombre: 1000, prefix: true, name: "Test", debug: true }))
//console.timeEnd("original");
//console.log(hypixel.cacul({ demande: "CarroteGold", nombre: 1000, prefix: true, name: "Test" }))
// Mesurer le temps d'exécution de la version optimisée
console.time("optimisée");


for (let i = 0; i < nbTests; i++) {
    promises.push(StartCode(3, null, "CarroteGold", false, 1, false));
}
console.timeEnd("optimisée");
//console.log(promises)
/*
1
or: 0.929ms
op: 0.378ms
10
or: 1.179ms
op: 0.346ms

*/
