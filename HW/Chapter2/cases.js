const factorial = (n) => {
    if(n==0){
        return 1;
    }

    return n*factorial(n-1)
}

const permutation = (n,r) => {
    return factorial(n)/factorial(n-r);
}

const combination = (n,r) => {
    return permutation(n,r)/factorial(r);
}

const multiPermutation = (n,r) => {
    result = 1;
    while(r>0){
        result = result*n;
        r--;
    }
    return result;
}

const multiCombination = (n,r) => {
    return combination(n+r-1,r);
}

module.exports={
    permutation,
    combination,
    multiPermutation,
    multiCombination
}