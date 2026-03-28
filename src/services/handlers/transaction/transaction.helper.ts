export const generateAccountKey = ({ account, agency }: { account: string, agency: string }) => {
    return `${account}-${agency}`
}