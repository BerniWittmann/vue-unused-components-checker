import { getDynamicImportName } from './checker';

describe('Can get dynamically imported component names', () => {
  it('Should correct handle nested directories', () => {
    expect(getDynamicImportName('src/components/one/two/testComponent.vue')).toBe('OneTwoTestComponent')
  });
  it('Should correct handle in the root directory', () => {
    expect(getDynamicImportName('src/components/TestComponent.vue')).toBe('TestComponent')
  });
  it('Should ignore non components', () => {
    expect(getDynamicImportName('src/pages/Home.vue')).toBeNull()
  });
})