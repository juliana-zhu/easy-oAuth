import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import {terser} from 'rollup-plugin-terser';
import {eslint} from 'rollup-plugin-eslint';
import json from 'rollup-plugin-json';

const isDev = process.env.NODE_ENV !== 'production';

export default [
    {
        input: 'lib/index.js',
        output: [
            {file: 'dist/oauth.cjs.js', format: 'cjs'},
            {file: 'dist/oauth.esm.js', format: 'es'},
            {name: 'oauth', file: 'dist/oauth.umd.js', format: 'umd'}
        ],
        external: ['js-cookie', 'qs', 'axios'],
        watch: {
            include: 'src/**'
        },
        plugins: [
            eslint({
                throwOnError: true,
                throwOnWarning: true,
                include: ['src/**'],
                exclude: ['node_modules/**']
            }),
            resolve(),  // 这样 Rollup 能找到 `ms`
            commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
            babel({
                exclude: 'node_modules/**', // 防止打包node_modules下的文件
                runtimeHelpers: true,       // 使plugin-transform-runtime生效
            }),
            json(),
            !isDev && terser()
        ]
    }
];
