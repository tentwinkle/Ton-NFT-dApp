import { NftDapp } from '../wrappers/NftDapp';
import { NetworkProvider } from '@ton-community/blueprint';
import { Address } from 'ton-core';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Dapp address'));

    const nftDapp = provider.open(NftDapp.createFromAddress(address));

    await nftDapp.sendDeployItemMsg(provider.sender(), {
            itemIndex: 0,
            itemOwnerAddress: address,
            itemAuthorityAddress: address,
          // itemContent: '1',
            queryId: Date.now(),
            collectionId: 16,
    });

    ui.write("Item successfully deployed!");
}

