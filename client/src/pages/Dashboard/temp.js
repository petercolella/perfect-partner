import usePhoneFormat from '../../hooks/usePhoneFormat';

const [mask, setMask] = useState('');
const [phoneValue] = usePhoneFormat(mask, dashboardUser.phone);

const handlePhoneInputChange = event => {
  const { value } = event.target;
  const { mask } = event.target.attributes;
  setMask(mask.value);
  console.log('phoneValue', phoneValue);
  setDashboardUser({ ...dashboardUser, phone: value });
};

handlePhoneInputChange = { handlePhoneInputChange };

<TextField
  onChange={handlePhoneInputChange}
  value={user.phone}
  id="phone"
  label="Phone"
  type="tel"
  fullWidth
  name="phone"
  margin="normal"
  variant="outlined"
  inputProps={{ mask: '(999) 999-9999' }}
/>;
