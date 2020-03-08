export const selectorStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid #ccc',
    color: state.isSelected ? 'white' : '#444444',
    padding: 2,
    fontSize: '18px',
  }),
  container: provided => ({
    ...provided,
    display: 'inline-block',
    width: '400px',
    minHeight: '1px',
    textAlign: 'left',
    border: 'none',
  }),
  control: provided => ({
    ...provided,
    border: '1px solid #dddddd ',
    borderRadius: '0',
    minHeight: '1px',
    height: '45px',
  }),
  input: provided => ({
    ...provided,
    fontSize: '16px',
    minHeight: '1px',
    height: '48px',
    paddingTop: '0',
    paddingBottom: '3',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    paddingTop: '0',
    paddingBottom: '3px',
    color: '#757575',
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
  clearIndicator: provided => ({
    ...provided,
    minHeight: '1px',
  }),
  valueContainer: provided => ({
    ...provided,
    fontSize: '16px',
    minHeight: '1px',
    height: '48px',
    paddingTop: '0',
    paddingBottom: '3',
  }),
  singleValue: provided => ({
    ...provided,
    minHeight: '1px',
    paddingBottom: '3px',
  }),
  loadingMessage: provided => ({
    ...provided,
    content: 'Carregando',
  }),
};

export const loadingMessage = 'Procurando';
