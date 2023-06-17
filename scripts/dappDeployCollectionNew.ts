import { NftDapp } from '../wrappers/NftDapp';
import { compile, NetworkProvider } from '@ton-community/blueprint';
import { Address } from 'ton-core';
import { buildNftCollectionDataCell } from '../wrappers/utils/collectionHelpers';
import { sleep } from '@ton-community/blueprint/dist/utils';
import { randomAddress } from '@ton-community/test-utils';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Dapp address'));

    const nftDapp = provider.open(NftDapp.createFromAddress(address));

    const collectionDataCell = buildNftCollectionDataCell({
      ownerAddress: address, 
      nextItemIndex: 0, 
      collectionContent: '',
      commonContent: '',
      nftItemCode: await compile('AdminNft'),
      royaltyParams: {
        royaltyFactor: 12,
        royaltyBase: 100,
        royaltyAddress: randomAddress()
      }
  });

    await nftDapp.sendDeployCollectionMsg(provider.sender(), {
        collectionCode: await compile('AdminCollection'),
        collectionData: collectionDataCell,
        queryId: Date.now(),
    });

    sleep(3500);

    ui.write("Collection deployed!");
}

