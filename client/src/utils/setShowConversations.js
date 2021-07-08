export const setShowConversations = (arr) => {
    const lengthArr = arr?.length;
    const textConversation = arr?.reduce((repo, cur, index ) => {
        return ( index === 0 )? `${cur} ` : (index === lengthArr-1) ? `${repo} và ${cur}.`: `${repo}, ${cur}`;
    },'')
    return textConversation;
}