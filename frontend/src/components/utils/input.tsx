interface InputProps {
    ph?: string;
    type?: string;
    label?: string;
    size?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=>void;

  }
  
  export default function Input({ ph, type, label, onChange, size }: InputProps) {
    return (
      <div className="flex flex-col gap-1.5">
        <p className="font-semibold text-lg">{label}</p>
        <input onChange={onChange}
          placeholder={ph} 
          className={`p-2 border rounded border-slate-950 ${size || "w-64"}`}
          type={type} 
        />
      </div>
    );
  }