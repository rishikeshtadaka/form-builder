export const ANDing = (arr: any[]) => {
    // Initialise ans variable is arr[0]
    let ans = arr[0];
    // Traverse the array compute AND
    for (let i = 0; i < arr.length; i++) {
        ans = (ans & arr[i]);
    }
    // Return ans
    return ans;
};

export const ORing = (arr: any[]) => {
    // Initialise ans variable is arr[0]
    let ans = arr[0];
    // Traverse the array compute AND
    for (let i = 0; i < arr.length; i++) {
        ans = (ans || arr[i]);
    }
    // Return ans
    return ans;
};

export class Util{
    public static getUniqueName():string{
        return `_Name_${new Date().getTime()}`;
    }
    public static getUniqueShortTextLabel():string{
        return `Short_Text_${new Date().getTime()}`;
    }
    public static getUniqueLongTextLabel():string{
        return `Long_Text_${new Date().getTime()}`;
    }
    public static getUniqueNumberLabel():string{
        return `Number_${new Date().getTime()}`;
    }
    public static getUniqueDropdownLabel():string{
        return `Dropdown_${new Date().getTime()}`;
    }
    public static getUniqueSingleSelectionLabel():string{
        return `Single_Selection_${new Date().getTime()}`;
    }
    public static getUniqueMultipleSelectionLabel():string{
        return `Multiple_Selection_${new Date().getTime()}`;
    }
}