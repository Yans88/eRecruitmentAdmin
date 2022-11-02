import {StatusPengajuanPipe} from './status-pengajuan.pipe';

describe('StatusPengajuanPipe', () => {
  const pipe = new StatusPengajuanPipe();
  it('create an instance', () => {

    expect(pipe).toBeTruthy();
  });

  it('transforms Value 1 to Badge', () => {
    expect(pipe.transform(1)).toBe('<span class="p-badge p-badge-warning">New</span>');
  });

  it('transforms Value 2 to Badge', () => {

    expect(pipe.transform(2)).toBe('<span class="p-badge p-badge-danger">Reject</span>');
  });

  it('transforms Value 3 to Badge', () => {
    expect(pipe.transform(3)).toBe('<span class="p-badge p-badge-success">Posted</span>');
  });

  it('transforms default to Badge', () => {
    expect(pipe.transform(0)).toBe('<span class="p-badge p-badge-info">Closed</span>');
  });

});
