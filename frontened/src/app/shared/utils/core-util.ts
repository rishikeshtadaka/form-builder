import { ExpressionModel } from "@core/model/validation-configuration.model";
import { flatMapDeep } from "lodash";

export const CONDITIONS = ['gt', 'lt', 'gte', 'gtoet', 'lte', 'ltoet', 'eq', 'et'];

export const ANDing = (arr: any[]) => {
    // Initialise ans variable is arr[0]
    let ans = arr[0];

    // Traverse the array compute AND
    for (let i = 0; i < arr.length; i++) {
        ans = (ans & arr[i]);
    }

    // Return ans
    return ans;
}

export const ORing = (arr: any[]) => {
    // Initialise ans variable is arr[0]
    let ans = arr[0];

    // Traverse the array compute AND
    for (let i = 0; i < arr.length; i++) {
        ans = (ans || arr[i]);
    }

    // Return ans
    return ans;
}

const getChildrens: any = (memeber: any) => {
    const mem = { ...memeber };
    if (mem.elements) {
        delete mem.elements;
    }

    // admin user logic
    if (!memeber.elements || !memeber.elements.length) {
        return mem;
    }

    if (memeber.elements && memeber.elements.length) {
        return [mem, flatMapDeep(memeber.elements, getChildrens)]
    }

}
export const getTotalElementsFromTree = (arr: any[]) => {
    return flatMapDeep(arr, getChildrens);
}

export const evaluteExpression = (expressions: any[]) => {
    let expressionString = '';
    let expressionValue: any;
    expressions.forEach(element => {
        if (element.type == 'if') {
            expressionValue = element.value;
        }
        if (element.type == 'and') {
            expressionValue = expressionValue && element.value;
        }
        if (element.type == 'or') {
            expressionValue = expressionValue || element.value;
        }
    });
    return expressionValue || false;
}

export const getConditionString = (expression: ExpressionModel, value: any, expressionString: string) => {
    let isChecked = false;
    if (expression.operator?.toLowerCase() == 'gt') {
        isChecked = value > expression.value;
    } else if (expression.operator?.toLowerCase() == 'lt') {
        isChecked = value < expression.value;
    }
    if (expression.operator?.toLowerCase() == 'gte' || expression.operator?.toLowerCase() == 'gtoet') {
        isChecked = value >= expression.value;
    } else if (expression.operator?.toLowerCase() == 'lte' || expression.operator?.toLowerCase() == 'ltoet') {
        isChecked = value <= expression.value;
    }
    else if (expression.operator?.toLowerCase() == 'eq' || expression.operator?.toLowerCase() == 'et') {
        isChecked = value == expression.value;
    }

    let op = expression.condition == 'if' ? '&&' : (expression.condition == 'AND' ? '&&' : (expression.condition == 'OR' ? '||' : ''));

    let responseString = expressionString == '' ? `${isChecked}` : `${expressionString} ${op} ${isChecked}`;
    return responseString;
}