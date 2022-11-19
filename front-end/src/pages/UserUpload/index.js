import * as React from 'react';
import { useState } from 'react';
import './UserUpload.css';
import Topbar, { TopbarType } from '../../components/Topbar';
import RGInput from '../../components/UtilityComponents/RGInput';
import RGButton from '../../components/RGButton';

const FoodGroups = ['fruit', 'vegetable', 'meat', 'grain', 'spice'];
const FoodMeasures = ['g', 'cup', 'tbsp', 'tsp', 'pinch', 'ml', 'kg', 'liter', 'lbs', 'oz', 'fl. oz', 'number'];

function UserUpload(): React.Node {
  const [titleText, setTitleText] = useState('');
  const [instructionList, setInstructionList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recipeCover, setRecipeCover] = useState(null);
  const [fileError, setFileError] = useState('Please upload an image.');

  const onSubmit = () => {
    console.log('Submitting...');
  };

  const handleFileInput = (e) => {
    // handle validations
    // Need to validate file type on back-end
    const file = e.target.files[0];
    const size = parseFloat(file.size / (1024 * 1024)).toFixed(2);
    if (size >= 0.16) {
      setFileError('File size cannot exceed more than 1MB');
      setRecipeCover(null);
      return;
    }
    setFileError('');
    setRecipeCover(file);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = () => null;

  const onStepChange = (ind, ev) => {
    const text = ev.target.value;
    const steps = [...instructionList];
    steps[ind] = text;
    setInstructionList(steps);
  };

  const addInstruction = () => {
    setInstructionList([...instructionList, '']);
  };

  const removeInstruction = (ind) => {
    const steps = [...instructionList];
    const data = steps.slice(0, ind).concat(steps.slice(ind + 1));
    setInstructionList(data);
  };

  const onIngTypeChange = (ind, type) => {
    const ingList = [...ingredientsList];
    ingList[ind].type = type;
    setIngredientsList(ingList);
  };

  const onIngNameChange = (ind, ev) => {
    const name = ev.target.value;
    const ingList = [...ingredientsList];
    ingList[ind].name = name;
    setIngredientsList(ingList);
  };

  const onIngMeasureChange = (ind, ev) => {
    const measure = ev.target.value;
    const ingList = [...ingredientsList];
    ingList[ind].measure = measure;
    setIngredientsList(ingList);
  };

  const onIngQuantityChange = (ind, ev) => {
    const quantity = ev.target.value;
    const ingList = [...ingredientsList];
    ingList[ind].quantity = quantity;
    setIngredientsList(ingList);
  };

  const addIngredient = () => {
    const ingList = [...ingredientsList];
    ingList.push({
      type: FoodGroups[0],
      quantity: 0,
      name: '',
      measure: FoodMeasures[0],
    });
    setIngredientsList(ingList);
  };

  const removeIngredient = (ind) => {
    const ings = [...ingredientsList];
    const data = ings.slice(0, ind).concat(ings.slice(ind + 1));
    setIngredientsList(data);
  };

  console.log(ingredientsList);

  const instructionInputs = instructionList.map((step, ind) => (
    <div
      className="step-input"
      key={ind}
    >
      <button
        onClick={() => removeInstruction(ind)}
        type="button"
      >
        <h6>
          {ind + 1}
          .
        </h6>
      </button>
      <RGInput
        label={`Step ${ind + 1}`}
        onChange={(ev) => onStepChange(ind, ev)}
        placeholder="Enter the next step"
        type="text"
        value={step}
      />
    </div>
  ));

  const ingredientInputs = ingredientsList.map((ing, ind) => (
    <div className="ing-input" key={ind}>
      <div className="ing-type ing-field">
        <p className="soft-comment">Type</p>
        <select
          name="Food Group"
          id="foodGroup"
          onChange={(ev) => onIngTypeChange(ind, ev.target.value)}
          value={ing.type}
        >
          {FoodGroups.map((group, groupInd) => (
            <option
              key={groupInd}
            >
              {group}
            </option>
          ))}
        </select>
      </div>
      <div className="ing-field input">
        <p className="soft-comment">Name</p>
        <RGInput
          onChange={(ev) => onIngNameChange(ind, ev)}
          placeholder="Ingredient Name"
          type="text"
          value={ing.name}
          fontSize="0.65em"
          padding="5px 12px"
        />
      </div>
      <div className="ing-field input">
        <p className="soft-comment">Quantity</p>
        <RGInput
          onChange={(ev) => onIngQuantityChange(ind, ev)}
          placeholder="Amount"
          type="number"
          value={ing.quantity}
          width="max-content"
          fontSize="0.65em"
          padding="5px 12px"
        />
      </div>
      <div className="ing-field">
        <p className="soft-comment">Unit</p>
        <select
          name="Food Measure"
          id="foodMEasure"
          onChange={(ev) => onIngMeasureChange(ind, ev)}
          value={ing.measure}
        >
          {FoodMeasures.map((measure, measureInd) => (
            <option
              key={measureInd}
            >
              {measure}
            </option>
          ))}
        </select>
      </div>
      <button
        className="minus"
        onClick={() => removeIngredient(ind)}
        type="button"
      >
        <span className="material-icons-outlined">
          do_not_disturb_on
        </span>
      </button>
    </div>
  ));

  return (
    <>
      <Topbar
        hasBackButton
        type={TopbarType.TOPBAR_WITH_BACK_BUTON}
        title="Create a recipe"
      />
      <section className="rga-section rg-ur-main">
        <div className="rg-upload-recipe">
          <div
            className="file-drop-zone"
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <span className="icon material-icons-outlined">
              file_upload
            </span>
            <h6>Upload your cover image</h6>
            <p>A preview will appear below</p>
            <input
              accept="image/*"
              onChange={handleFileInput}
              type="file"
            />
          </div>
          <div className="file-loading-status">
            <div className="status-details">
              <div className="main-icon">
                <span className="main-icon material-icons">
                  article
                </span>
                <p>{recipeCover?.name || fileError }</p>
              </div>
              <span className="status-icon material-icons-outlined">
                { recipeCover ? 'done' : 'close' }
              </span>
            </div>
            <div className={recipeCover ? 'status-bar' : 'status-bar error'} />
          </div>
          <br />
          <RGInput
            onChange={(ev) => setTitleText(ev.target.value)}
            type="text"
            label="Recipe Title"
            value={titleText}
          />
          <section className="ingredients-input">
            <h6>
              Ingredients
              <span className="mx-3">
                <RGButton
                  isFlat
                  onAction={addIngredient}
                  text="Add Ingredient"
                  width="max-content"
                />
              </span>
            </h6>
            {ingredientInputs}
          </section>
          <section className="instruction-inputs">
            <h6>
              Instructions
              <span className="mx-3">
                <RGButton
                  isFlat
                  onAction={addInstruction}
                  text="Add Instruction"
                  width="max-content"
                />
              </span>
            </h6>
            <p className="soft-comment">Click an instruction&apos;s number to delete it</p>
            {instructionInputs}
          </section>
          <RGButton
            className="mb-3"
            isBoxed
            onAction={onSubmit}
            text="Upload Your Recipe"
          />
        </div>
      </section>
    </>
  );
}

export default UserUpload;
