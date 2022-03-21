export const createPatient=`INSERT INTO patients 
                           (p_id,p_name,p_email,p_phonenumber,p_address,p_country,p_town,p_district,p_streetnumber,p_national_id,doneon)
                           VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;
export const getByEmail=`SELECT p_id,p_name,p_email,p_phonenumber,p_address,p_address,p_country,p_town,p_district,p_streetnumber,p_national_id 
                         FROM patients where p_email=$1`;