import { Basic, Form, FormFieldBase } from "../../../API/FormFactory";
import { Request, Response } from "express";

export namespace Bootstrap4
{
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    export class TextFormField extends Basic.TextFormField
    {
        protected helpMsg: string|undefined = undefined;

        public SetHelpMessage(_helpMsg: string|undefined) : FormFieldBase
        {
            this.helpMsg = _helpMsg;
            return this;
        }

        public verify(_request: Request, _result: Form): boolean {
            return super.verify(_request, _result);
        }

        protected layout(_input:string) : string
        {
            var result = '<div class="form-group">\n';
            if (this.label != undefined)
            {
                if (this.label.length > 0)
                {
                    result += `<label for="[${this.GetFormIndentifier()}][${this.id}]">${this.label}</label>\n`;
                }
            }
            result += _input;
            if (this.helpMsg != undefined)
            {
                if (this.helpMsg.length > 0)
                {
                    result += `<small id="[${this.GetFormIndentifier()}][${this.id}].helpId" class="form-text text-muted">${this.helpMsg}</small>\n`;
                }
            }
            result += "</div>";
            return result;
        }

        public construct(_response: Response): string 
        {
            return this.layout(`<input type="text" class="form-control" name="[${this.GetFormIndentifier()}][${this.id}]" id="[${this.GetFormIndentifier()}][${this.id}]" aria-describedby="[${this.GetFormIndentifier()}][${this.id}].helpId" placeholder="">`);
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    export class PasswordFormField extends Basic.PasswordFormField
    {
        protected helpMsg: string = "";
        protected label: string = "";

        constructor(_id: string, _required: boolean = true, _attached: string|undefined = undefined)
        {
            super(_id, _required);
        }

        public SetLabel(_label: string) : FormFieldBase
        {
            this.label = _label;
            return this;
        }

        public SetHelpMessage(_helpMsg: string) : FormFieldBase
        {
            this.helpMsg = _helpMsg;
            return this;
        }

        public construct(_response: Response): string 
        {
            return this.layout(`<input type="password" class="form-control" name="[${this.GetFormIndentifier()}][${this.id}]" id="[${this.GetFormIndentifier()}][${this.id}]" aria-describedby="[${this.GetFormIndentifier()}][${this.id}].helpId" placeholder="">`);
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    export class EmailFormField extends Basic.EmailFormField
    {
        public construct(_response: Response): string 
        {
            return this.layout(`<input type="email" class="form-control" name="[${this.GetFormIndentifier()}][${this.id}]" id="[${this.GetFormIndentifier()}][${this.id}]" aria-describedby="[${this.GetFormIndentifier()}][${this.id}].helpId" placeholder="">`);
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    export class CheckboxFormField extends FormFieldBase
    {
        protected label: string = "";
        protected checked: boolean = false;

        public SetLabel(_label: string) : CheckboxFormField
        {
            this.label = _label;
            return this;
        }

        public SetChecked(_checked: boolean) : CheckboxFormField
        {
            this.checked = _checked;
            return this;
        }

        public verify(_request: Request, _result: Form): boolean 
        {
            return true;
        }
        public construct(_response: Response): string 
        {
            const checkedValue = this.checked ? 'value="checkedValue" checked' : "";
            return `
<div class="form-check">
    <label class="form-check-label">
    <input type="checkbox" class="form-check-input" name="[${this.GetFormIndentifier()}][${this.id}]" id="[${this.GetFormIndentifier()}][${this.id}]" ${checkedValue}>
    ${this.label}
    </label>
</div>
            `;
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    export class SubmitFormField extends FormFieldBase
    {
        private label:string;
        constructor(_id: string, _label: string = "Submit")
        {
            super(_id, true);
            this.label = _label;
        }
    
        public verify(_request: Request, _result: Form): boolean 
        {
            return true;
        }
        public construct(_response: Response): string 
        {
            return `<button type="submit" class="btn btn-primary" name='[${this.GetFormIndentifier()}][${this.id}]' id='[${this.GetFormIndentifier()}][${this.id}]'>${this.label}</button>`;
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}