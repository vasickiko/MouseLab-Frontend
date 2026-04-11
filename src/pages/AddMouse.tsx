import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import api from "../api/api";

type SizeCategory = "small" | "medium" | "large";
type ShapeCategory = "symmetrical" | "asymmetrical";
type GripStyle = "palm" | "claw" | "aggressive claw" | "relaxed claw" | "fingertip";
type Connectivity = "wired" | "wireless";

interface MouseFormData {
  image: File | null;
  brand: string;
  model: string;
  sizeCategory: SizeCategory;
  dimensions: {
    width: string;
    height: string;
    length: string;
  };
  weight: string;
  shapeCategory: ShapeCategory;
  gripStyles: GripStyle[];
  sensor: string;
  connectivity: Connectivity;
  mcu: string;
  performance: {
    dpi: string;
    pollingRate: string;
    trackingSpeed: string;
    acceleration: string;
  };
  batteryMah: string;
  batteryLife: string;
  software: string;
  switches: string;
  scrollWheel: string;
  material: string;
  coating: boolean;
  color: string[];
  affiliateLink: {
    amazon: string;
    aliExpress: string;
  };
}

const INITIAL_FORM: MouseFormData = {
  image: null,
  brand: "",
  model: "",
  sizeCategory: "medium",
  dimensions: {
    width: "",
    height: "",
    length: "",
  },
  weight: "",
  shapeCategory: "symmetrical",
  gripStyles: [],
  sensor: "",
  connectivity: "wired",
  mcu: "",
  performance: {
    dpi: "",
    pollingRate: "",
    trackingSpeed: "",
    acceleration: "",
  },
  batteryMah: "",
  batteryLife: "",
  software: "",
  switches: "",
  scrollWheel: "",
  material: "",
  coating: false,
  color: [""],
  affiliateLink: {
    amazon: "",
    aliExpress: "",
  },
};

const AddMouse = () => {
  const [form, setForm] = useState<MouseFormData>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && name === "coating") {
      const checked = (e.target as HTMLInputElement).checked;

      setForm((prev) => ({
        ...prev,
        coating: checked,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDimensionsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [name]: value,
      },
    }));
  };

  const handlePerformanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      performance: {
        ...prev.performance,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleGripStyleChange = (style: GripStyle) => {
    setForm((prev) => {
      const alreadyExists = prev.gripStyles.includes(style);

      return {
        ...prev,
        gripStyles: alreadyExists
          ? prev.gripStyles.filter((item) => item !== style)
          : [...prev.gripStyles, style],
      };
    });
  };

  const handleAffiliateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      affiliateLink: {
        ...prev.affiliateLink,
        [name]: value,
      },
    }));
  };

  const handleColorChange = (index: number, value: string) => {
    setForm((prev) => {
      const updatedColors = [...prev.color];
      updatedColors[index] = value;

      return {
        ...prev,
        color: updatedColors,
      };
    });
  };

  const handleAddColorSlot = () => {
    setForm((prev) => ({
      ...prev,
      color: [...prev.color, ""],
    }));
  };

  const handleRemoveColorSlot = (index: number) => {
    setForm((prev) => ({
      ...prev,
      color:
        prev.color.length === 1
          ? [""]
          : prev.color.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const formData = new FormData();

      if (form.image) {
        formData.append("image", form.image);
      }

      formData.append("brand", form.brand);
      formData.append("model", form.model);
      formData.append("sizeCategory", form.sizeCategory);
      formData.append("weight", form.weight);
      formData.append("shapeCategory", form.shapeCategory);
      formData.append("sensor", form.sensor);
      formData.append("connectivity", form.connectivity);
      formData.append("switches", form.switches);
      formData.append("scrollWheel", form.scrollWheel);
      formData.append("material", form.material);
      formData.append("batteryMah", form.batteryMah);
      formData.append("batteryLife", form.batteryLife);
      formData.append("coating", String(form.coating));

      formData.append("width", form.dimensions.width);
      formData.append("height", form.dimensions.height);
      formData.append("length", form.dimensions.length);

      formData.append("dpi", form.performance.dpi);
      formData.append("pollingRate", form.performance.pollingRate);
      formData.append("trackingSpeed", form.performance.trackingSpeed);
      formData.append("acceleration", form.performance.acceleration);
      formData.append("mcu", form.mcu);

      formData.append("gripStyles", JSON.stringify(form.gripStyles));
      formData.append("software", form.software);

      formData.append("colors", JSON.stringify(form.color.filter((item) => item.trim() !== "")))

      formData.append("amazon", form.affiliateLink.amazon);
      formData.append("aliExpress", form.affiliateLink.aliExpress);

      await api.post("/mice", formData);

      setMessage("Mouse created successfully.");
      setForm(INITIAL_FORM);
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong while creating the mouse.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl bg-white/10 text-white p-6 rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6">Create New Mouse</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="amazon"
            placeholder="Amazon link"
            value={form.affiliateLink.amazon}
            onChange={handleAffiliateChange}
            className="p-3 rounded-lg text-black"
          />

          <input
            type="text"
            name="aliExpress"
            placeholder="AliExpress link"
            value={form.affiliateLink.aliExpress}
            onChange={handleAffiliateChange}
            className="p-3 rounded-lg text-black"
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="p-3 rounded-lg text-black"
          />

          <input
            type="text"
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
            className="p-3 rounded-lg text-black"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <select
            name="sizeCategory"
            value={form.sizeCategory}
            onChange={handleChange}
            className="p-3 rounded-lg text-black"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          <select
            name="shapeCategory"
            value={form.shapeCategory}
            onChange={handleChange}
            className="p-3 rounded-lg text-black"
          >
            <option value="symmetrical">Symmetrical</option>
            <option value="asymmetrical">Asymmetrical</option>
          </select>
        </div>

        <div>
          <select
            name="software"
            value={form.software}
            onChange={handleChange}
            className="p-3 rounded-lg text-black"
          >
            <option value="web and download">Web and Download</option>
            <option value="download">Download</option>
            <option value="web">Web</option>
          </select>
          
          <input
            type="text"
            name="batteryLife"
            placeholder="Battery Life"
            value={form.batteryLife}
            onChange={handleChange}
            className="p-3 rounded-lg text-black"
          />
        </div>

        <div className="space-y-3">
          <label className="block font-medium">Colors</label>

          {form.color.map((singleColor, index) => (
            <div key={index} className="flex gap-3 items-center">
              <input
                type="text"
                placeholder="Example: black or #000000"
                value={singleColor}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="p-3 rounded-lg text-black flex-1"
              />

              <div
                className="w-10 h-10 rounded-lg border border-white/30"
                style={{ backgroundColor: singleColor || "transparent" }}
              />

              <button
                type="button"
                onClick={() => handleRemoveColorSlot(index)}
                className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddColorSlot}
            className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600"
          >
            Add another color
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="number"
            name="width"
            placeholder="Width"
            value={form.dimensions.width}
            onChange={handleDimensionsChange}
            className="p-3 rounded-lg text-black"
          />

          <input
            type="number"
            name="height"
            placeholder="Height"
            value={form.dimensions.height}
            onChange={handleDimensionsChange}
            className="p-3 rounded-lg text-black"
          />

          <input
            type="number"
            name="length"
            placeholder="Length"
            value={form.dimensions.length}
            onChange={handleDimensionsChange}
            className="p-3 rounded-lg text-black"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={form.weight}
            onChange={handleChange}
            className="p-3 rounded-lg text-black"
          />

          <select
            name="connectivity"
            value={form.connectivity}
            onChange={handleChange}
            className="p-3 rounded-lg text-black"
          >
            <option value="wired">Wired</option>
            <option value="wireless">Wireless</option>
          </select>
        </div>

        <input
          type="text"
          name="sensor"
          placeholder="Sensor"
          value={form.sensor}
          onChange={handleChange}
          className="w-full p-3 rounded-lg text-black"
        />

        <input
          type="text"
          name="mcu"
          placeholder="MCU"
          value={form.mcu}
          onChange={handleChange}
          className="w-full p-3 rounded-lg text-black"
        />

        <div>
          <p className="font-semibold mb-3">Grip Styles</p>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.gripStyles.includes("palm")}
                onChange={() => handleGripStyleChange("palm")}
              />
              Palm
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.gripStyles.includes("claw")}
                onChange={() => handleGripStyleChange("claw")}
              />
              Claw
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.gripStyles.includes("aggressive claw")}
                onChange={() => handleGripStyleChange("aggressive claw")}
              />
              Aggressive Claw
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.gripStyles.includes("relaxed claw")}
                onChange={() => handleGripStyleChange("relaxed claw")}
              />
              Relaxed Claw
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.gripStyles.includes("fingertip")}
                onChange={() => handleGripStyleChange("fingertip")}
              />
              Fingertip
            </label>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            name="dpi"
            placeholder="DPI"
            value={form.performance.dpi}
            onChange={handlePerformanceChange}
            className="p-3 rounded-lg text-black"
          />

          <input
            type="number"
            name="pollingRate"
            placeholder="Polling Rate"
            value={form.performance.pollingRate}
            onChange={handlePerformanceChange}
            className="p-3 rounded-lg text-black"
          />

          <input
            type="number"
            name="trackingSpeed"
            placeholder="Tracking Speed"
            value={form.performance.trackingSpeed}
            onChange={handlePerformanceChange}
            className="p-3 rounded-lg text-black"
          />

          <input
            type="number"
            name="acceleration"
            placeholder="Acceleration"
            value={form.performance.acceleration}
            onChange={handlePerformanceChange}
            className="p-3 rounded-lg text-black"
          />
        </div>

        {form.connectivity === "wireless" && (
          <input
            type="number"
            name="batteryMah"
            placeholder="Battery mAh"
            value={form.batteryMah}
            onChange={handleChange}
            className="w-full p-3 rounded-lg text-black"
          />
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            name="switches"
            placeholder="Switches"
            value={form.switches}
            onChange={handleChange}
            className="p-3 rounded-lg text-black"
          />

          <input
            type="text"
            name="scrollWheel"
            placeholder="Scroll Wheel"
            value={form.scrollWheel}
            onChange={handleChange}
            className="p-3 rounded-lg text-black"
          />
        </div>

        <input
          type="text"
          name="material"
          placeholder="Material"
          value={form.material}
          onChange={handleChange}
          className="w-full p-3 rounded-lg text-black"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="coating"
            checked={form.coating}
            onChange={handleChange}
          />
          Has coating
        </label>

        <div className="space-y-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm"
          />

          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              alt="Preview"
              className="w-40 rounded-lg border border-white/20"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold"
        >
          {loading ? "Creating..." : "Create Mouse"}
        </button>

        {message && <p className="text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default AddMouse;