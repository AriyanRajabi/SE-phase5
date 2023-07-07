import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

const PackageDetails = ({
  cost,
  duration,
  procedures = [],
  services = [],
  loading,
}) => {
  const calcTotalCost = () => {
    let c = 0;
    services.forEach((s) => {
      c += s.cost;
    });
    return cost + c;
  };
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
      <br />
      <br />
      <Typography>هزینه درمان:{cost}</Typography>
      <br />
      <Typography>مدت زمان به روز: {duration}</Typography>
      <br />
      <Typography>روند های مورد نیاز:</Typography>
      <br />
      {procedures.map((p, i) => {
        return (
          <Fragment key={i}>
            <Typography>{p.name}</Typography>
            <Typography variant="caption">{p.description}</Typography>
            <input type="file" />
            <Divider sx={{ margin: 1 }} />
          </Fragment>
        );
      })}
      <br />
      <Typography>سرویس ها:</Typography>
      {services.map((s, i) => {
        return (
          <Fragment key={i}>
            <Typography>{s.name}</Typography>
            <Typography>هزینه: {s.cost}</Typography>
            <Divider />
          </Fragment>
        );
      })}
      <br />
      <br />
      <Typography>هزینه کل: {calcTotalCost()}</Typography>
    </>
  );
};

export default function RequestPackage() {
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [loadingPackage, setLoadingPackage] = useState(false);
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [treatmentPackage, setTreatmentPackage] = useState(undefined);
  const getPackages = async () => {
    setLoadingPackages(true);
    try {
      const { data } = await axios.get("http://localhost:3000/packages");
      setPackages(data.packages);
    } catch (error) {
      alert(error);
    }
    setLoadingPackages(false);
  };

  const submit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/submit-package/" + selected
      );
      console.log(data);
      alert("درخواست با موفقیت ثبت شد! نام متخصص سلامت:" + data.name);
    } catch (error) {
      console.log(error);

      alert(error);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);
  useEffect(() => {
    const getPackage = async () => {
      setLoadingPackage(true);
      try {
        const { data } = await axios.get(
          "http://localhost:3000/package/" + selected
        );
        console.log(data);
        setTreatmentPackage(data);
      } catch (error) {
        alert(error);
      }
      setLoadingPackage(false);
    };
    if (selected) {
      getPackage();
    }
  }, [selected]);
  return (
    <Card>
      <CardHeader title={<Typography>ثبت درخواست پکیچ درمانی</Typography>} />
      <CardContent>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="package-label">
            {loadingPackages ? "درحال دریافت..." : "انتخاب پکیج"}
          </InputLabel>

          <Select
            onChange={(e) => {
              setSelected(e.target.value);
            }}
            value={selected}
            id="package-label"
            disabled={loadingPackages}
            label={loadingPackages ? "درحال دریافت..." : "انتخاب پکیج"}
          >
            {packages.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {treatmentPackage && (
          <PackageDetails {...treatmentPackage} loading={loadingPackage} />
        )}
        {treatmentPackage && !loadingPackage && (
          <Button
            onClick={submit}
            variant="contained"
            sx={{ mt: 3, width: "100%" }}
          >
            ثبت درخواست
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
