import { Address, toNano } from 'ton-core';
import { NftDapp } from '../wrappers/NftDapp';
import { NetworkProvider } from '@ton-community/blueprint';
import { randomAddress } from '@ton-community/test-utils';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Dapp address'));

    const nftDapp = provider.open(NftDapp.createFromAddress(address));

        await nftDapp.sendTransferItemMsg(provider.sender(), {
            fwdAmount: toNano('0.01'),
            queryId: Date.now(),
            newOwner: randomAddress(),
            responseAddress: provider.sender().address as Address,
            itemAddress: Address.parse("EQD6En81KlAjcD2uOJugk5tKXL1E2a-kHg-ykDabmlcVvl02")
        });

    ui.write('Transfered successfully!');
}