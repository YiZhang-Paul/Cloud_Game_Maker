module.exports = {
    collectCoverage: true,
    coverageReporters: ['cobertura', 'text', 'text-summary'],
    collectCoverageFrom: [
        '**/*.ts',
        '!**/{node_modules,environments,mocks}/**',
        '!**/{main,polyfills}.ts',
        '!**/*.{module,spec}.ts'
    ]
};
