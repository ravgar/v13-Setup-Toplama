
const Sunucu_1 = "Anan";
module.exports = {
    apps: [
        {
            name: `Operator`,
            namespace: "Yarak_V13_Pub",
            script: "./Operator/main.js",
            watch: false
        },
        {
            name: `Statistics`,
            namespace: "Yarak_V13_Pub",
            script: "./Statistics/main.js",
            watch: true
        },
        {
            name: `Fundamental`,
            namespace: "Yarak_V13_Pub",
            script: "./Fundamental/main.js",
            watch: false
        },
        {
            name: `Shield-One`,
            namespace: "Yarak_V13_Pub",
            script: "./ShieldOne/main.js",
            watch: false
        },
        {
            name: `Shield-Two`,
            namespace: "Yarak_V13_Pub",
            script: "./ShieldTwo/main.js",
            watch: false
        }
    ]
};
