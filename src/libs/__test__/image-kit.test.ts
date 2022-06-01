import { buildImageKitURL, IMAGEKIT_BASE_URL } from '../image-kit';

describe('Resolve correct image url', () => {
  it('should add the domain prefix if supplied relative path', () => {
    const res = buildImageKitURL({ src: 'example.png' });
    expect(res).toBe(`${IMAGEKIT_BASE_URL}/example.png`);
  });
  it('should not add the domain prefix if supplied absolute path', () => {
    const res = buildImageKitURL({
      src: `${IMAGEKIT_BASE_URL}/example.png`,
    });
    expect(res).toBe(`${IMAGEKIT_BASE_URL}/example.png`);
  });
});

describe('Add transformation', () => {
  it('should correctly apply single transformation', () => {
    const res = buildImageKitURL({
      src: '/example.png',
      aspectRatio: '4:3',
    });
    expect(res).toBe(`${IMAGEKIT_BASE_URL}/example.png?tr=ar-4-3`);
  });
  it('should correctly apply multiple transformations', () => {
    const res = buildImageKitURL({
      src: '/example.png',
      quality: 10,
      blur: 40,
    });
    expect(res).toBe(`${IMAGEKIT_BASE_URL}/example.png?tr=q-10,bl-40`);
  });
});
