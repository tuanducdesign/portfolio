import { pick } from '../misc';

const post = {
  title: 'hello',
  body: 'world',
};

it('should pick correct keys', () => {
  expect(pick(post, ['body'])).toStrictEqual({
    body: 'world',
  });
});

it('should set value to null if key is not exist', () => {
  expect(pick(post, ['desc' as keyof typeof post])).toStrictEqual({
    desc: null,
  });
});
