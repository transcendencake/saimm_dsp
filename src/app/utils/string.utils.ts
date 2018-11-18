import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StringUtils {
    replaceUppercaseWithDashFollowedByLowerCase(str: string): string {
        return str.replace(/([A-Z])/g, "-$1").toLowerCase();
    }
}