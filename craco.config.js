const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#1E2335',
                            '@table-border-radius-base': '20px',
                            '@table-header-bg': '#b3bfc6',
                            '@table-font-size': '18px',
                            '@table-header-cell-split-color': '#f5f5fa',
                            '@table-padding-horizontal': '30px',
                            '@input-affix-margin': '8px',
                            '@border-radius-base': '8px',
                            '@checkbox-check-color': '#fff',
                            '@checkbox-border-radius': '2px',
                            '@input-bg': '#F5F5FA',
                            '@input-border-color': '#B3BFC6',
                            '@modal-header-bg': '#F5F5FA',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};