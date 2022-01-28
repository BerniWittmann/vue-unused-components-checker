"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checker_1 = require("./checker");
describe('Check Expression', () => {
    const expression = new RegExp(checker_1.getCheckExpression('test.vue'), 'i');
    describe('should detect normal imports', () => {
        it('should be able to detect with vue file suffix', () => {
            expect(expression.test("foo bar\n import MyComponent from 'my/file/path/test.vue' \n")).toBeTruthy();
        });
        it('should be able to detect without vue file suffix', () => {
            expect(expression.test("foo bar\n import MyComponent from 'my/file/path/test' \n")).toBeTruthy();
            expect(expression.test("foo bar\n import MyComponent from '@/components/test' \n")).toBeTruthy();
            expect(expression.test("foo bar\n import MyComponent from '@/test' \n")).toBeTruthy();
        });
        it('should be able to detect @ in filepath', () => {
            expect(expression.test("foo bar\n import MyComponent from '@/components/test.vue' \n")).toBeTruthy();
            expect(expression.test("foo bar\n import MyComponent from '@/test.vue' \n")).toBeTruthy();
        });
        it('should be able to detect ~ in filepath', () => {
            expect(expression.test("foo bar\n import MyComponent from '~/components/test.vue' \n")).toBeTruthy();
            expect(expression.test("foo bar\n import MyComponent from '~/test.vue' \n")).toBeTruthy();
        });
        it('should be able to detect with "', () => {
            expect(expression.test('foo bar\n import MyComponent from "my/file/path/test.vue" \n')).toBeTruthy();
        });
        it('should be able to detect with semicolon', () => {
            expect(expression.test("foo bar\n import MyComponent from 'my/file/path/test.vue'; \n")).toBeTruthy();
            expect(expression.test('foo bar\n import MyComponent from "my/file/path/test.vue"; \n')).toBeTruthy();
            expect(expression.test("foo bar\n import MyComponent from 'my/file/path/test'; \n")).toBeTruthy();
            expect(expression.test('foo bar\n import MyComponent from "my/file/path/test"; \n')).toBeTruthy();
        });
    });
    describe('should detect require calls', () => {
        it('should be able to detect with vue file suffix', () => {
            expect(expression.test("foo bar\n require('my/file/path/test.vue') \n")).toBeTruthy();
        });
        it('should be able to detect without vue file suffix', () => {
            expect(expression.test("foo bar\n require('my/file/path/test') \n")).toBeTruthy();
            expect(expression.test("foo bar\n require('@/components/test') \n")).toBeTruthy();
            expect(expression.test("foo bar\n require('@/test') \n")).toBeTruthy();
        });
        it('should be able to detect @ in filepath', () => {
            expect(expression.test("foo bar\n require('@/components/test.vue') \n")).toBeTruthy();
            expect(expression.test("foo bar\n require('@/test.vue') \n")).toBeTruthy();
        });
        it('should be able to detect ~ in filepath', () => {
            expect(expression.test("foo bar\n require('~/components/test.vue') \n")).toBeTruthy();
            expect(expression.test("foo bar\n require('~/test.vue') \n")).toBeTruthy();
        });
        it('should be able to detect with "', () => {
            expect(expression.test('foo bar\n require("my/file/path/test.vue") \n')).toBeTruthy();
        });
        it('should be able to detect with semicolon', () => {
            expect(expression.test("foo bar\n require('my/file/path/test.vue'); \n")).toBeTruthy();
            expect(expression.test('foo bar\n require("my/file/path/test.vue"); \n')).toBeTruthy();
            expect(expression.test("foo bar\n require('my/file/path/test'); \n")).toBeTruthy();
            expect(expression.test('foo bar\n require("my/file/path/test"); \n')).toBeTruthy();
        });
    });
    describe('should detect import calls', () => {
        it('should be able to detect with vue file suffix', () => {
            expect(expression.test("foo bar\n import('my/file/path/test.vue') \n")).toBeTruthy();
        });
        it('should be able to detect without vue file suffix', () => {
            expect(expression.test("foo bar\n import('my/file/path/test') \n")).toBeTruthy();
            expect(expression.test("foo bar\n import('@/components/test') \n")).toBeTruthy();
            expect(expression.test("foo bar\n import('@/test') \n")).toBeTruthy();
        });
        it('should be able to detect @ in filepath', () => {
            expect(expression.test("foo bar\n import('@/components/test.vue') \n")).toBeTruthy();
            expect(expression.test("foo bar\n import('@/test.vue') \n")).toBeTruthy();
        });
        it('should be able to detect ~ in filepath', () => {
            expect(expression.test("foo bar\n import('~/components/test.vue') \n")).toBeTruthy();
            expect(expression.test("foo bar\n import('~/test.vue') \n")).toBeTruthy();
        });
        it('should be able to detect with "', () => {
            expect(expression.test('foo bar\n import("my/file/path/test.vue") \n')).toBeTruthy();
        });
        it('should be able to detect with semicolon', () => {
            expect(expression.test("foo bar\n import('my/file/path/test.vue'); \n")).toBeTruthy();
            expect(expression.test('foo bar\n import("my/file/path/test.vue"); \n')).toBeTruthy();
            expect(expression.test("foo bar\n import('my/file/path/test'); \n")).toBeTruthy();
            expect(expression.test('foo bar\n import("my/file/path/test"); \n')).toBeTruthy();
        });
    });
    const dynamicExpression = new RegExp(checker_1.getCheckExpression('components/header/GoodBanner.vue', true), 'i');
    describe('Should handle dynamic imports', () => {
        it('Should identify dynamic imports', () => {
            expect(dynamicExpression.test("foo bar\n <HeaderGoodBanner/>")).toBeTruthy();
            expect(dynamicExpression.test("foo bar\n <HeaderGoodBanner />")).toBeTruthy();
            expect(dynamicExpression.test("foo bar\n <HeaderGoodBanner\n :param1='1'\n />")).toBeTruthy();
            expect(dynamicExpression.test("foo bar\n <GoodBanner/>")).toBeFalsy();
        });
        it('Should identify lazy loaded dynamic imports', () => {
            expect(dynamicExpression.test("foo bar\n <LazyHeaderGoodBanner/>")).toBeTruthy();
            expect(dynamicExpression.test("foo bar\n <LazyHeaderGoodBanner />")).toBeTruthy();
        });
        it('Should identify components that are referenced dynamically', () => {
            expect(dynamicExpression.test("foo bar\n return 'HeaderGoodBanner';")).toBeTruthy();
            expect(dynamicExpression.test("foo bar\n return \"LazyHeaderGoodBanner\";")).toBeTruthy();
            expect(dynamicExpression.test("foo bar\n return `HeaderGoodBanner`;")).toBeTruthy();
            expect(dynamicExpression.test("foo bar\n name: 'HeaderGoodBanner'")).toBeFalsy();
        });
        it('Should allow component names to have dashes', () => {
            expect(dynamicExpression.test("foo bar\n <Lazy-Header-Good-Banner/>")).toBeTruthy();
            expect(dynamicExpression.test("foo bar\n <header-good-banner />")).toBeTruthy();
        });
    });
});
//# sourceMappingURL=check-expression.test.js.map