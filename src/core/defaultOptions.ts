import { dirname } from 'path';
import { CreamOptions } from '@/interface';

const defaultOptions: CreamOptions = {
	rootPath: dirname(require.main?.filename || ''),
};

export default defaultOptions;
