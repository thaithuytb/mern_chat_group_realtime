export const getArrIdMembers = (data) => {
    return data.reduce((repo, cur) => {
      return [...repo, cur._id];
    }, []);
  };