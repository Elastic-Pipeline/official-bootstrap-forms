import { Basic, Form, FormFieldBase } from "../../../API/FormFactory";

export namespace Bootstrap4
{
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    export class TextFormField extends FormFieldBase
    {
        protected helpMsg: string = "";
        protected label: string = "";

        
        public SetLabel(_label: string) : TextFormField
        {
            this.label = _label;
            return this;
        }

        public SetHelpMessage(_helpMsg: string) : TextFormField
        {
            this.helpMsg = _helpMsg;
            return this;
        }

        public verify(_result: Form): boolean {
            return true;
        }

        protected layout(_identification: string, _input:string) : string
        {
            var result = '<div class="form-group">\n';
            if (this.label.length > 0)
            {
                result += `<label for="[${_identification}][${this.id}]">${this.label}</label>\n`;
            }
            result += _input;
            if (this.helpMsg.length > 0)
            {
                result += `<small id="[${_identification}][${this.id}].helpId" class="form-text text-muted">${this.helpMsg}</small>\n`;
            }
            result += "</div>";
            return result;
        }

        public construct(_identification: string): string 
        {
            return this.layout(_identification, `<input type="text" class="form-control" name="[${_identification}][${this.id}]" id="[${_identification}][${this.id}]" aria-describedby="[${_identification}][${this.id}].helpId" placeholder="">`);
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    export class PasswordFormField extends TextFormField
    {
        private attached: string;
    
        constructor(_id: string, _required: boolean = true, _attached: string = '')
        {
            super(_id, _required);
            this.attached = _attached;
        }
    
        public verify(_result: Form): boolean {
            if (this.attached != undefined)
            {
                const attachedField: FormFieldBase|undefined = _result.GetField(this.attached);
                if (attachedField == undefined)
                {
                    return false;
                }
    
                if (attachedField.GetValue() == this.GetValue())
                {
                    return false;
                }
            }
            return true;
        }
        public construct(_identification: string): string 
        {
            return this.layout(_identification, `<input type="password" class="form-control" name="[${_identification}][${this.id}]" id="[${_identification}][${this.id}]" aria-describedby="[${_identification}][${this.id}].helpId" placeholder="">`);
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    export class EmailFormField extends Basic.EmailFormField
    {
        public construct(_identification: string): string 
        {
            return this.layout(_identification, `<input type="email" class="form-control" name="[${_identification}][${this.id}]" id="[${_identification}][${this.id}]" aria-describedby="[${_identification}][${this.id}].helpId" placeholder="">`);
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

        public verify(_result: Form): boolean 
        {
            return true;
        }
        public construct(_identification: string): string 
        {
            const checkedValue = this.checked ? 'value="checkedValue" checked' : "";
            return `
<div class="form-check">
    <label class="form-check-label">
    <input type="checkbox" class="form-check-input" name="[${_identification}][${this.id}]" id="[${_identification}][${this.id}]" ${checkedValue}>
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
    
        public verify(_result: Form): boolean 
        {
            return true;
        }
        public construct(_identification: string): string 
        {
            return `<button type="submit" class="btn btn-primary" name='[${_identification}][${this.id}]' id='[${_identification}][${this.id}]'>${this.label}</button>`;
        }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}