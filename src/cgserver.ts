import { CgServerDriver, srvrOpts, wssServer } from '@thegraid/wspbserver';

wssServer(true, 'cgserver', srvrOpts('game7', '8444'), CgServerDriver)
