import { Avatar } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Image from "../assets/Avatar.png";
import { supabase } from "../supabaseClient";
import { UserResponse } from "@supabase/supabase-js";

const UserPage = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<null | UserResponse>(null);
  const [avatar, setAvatar] = useState(Image);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      let user = await supabase.auth.getUser();
      let id = user.data.user?.id;
      let data = await supabase.from('Users').select('avatar_url').eq('user_id', id);
      
      if (!data.data) return;
      
      let ava = data.data[0].avatar_url

      setAvatar(ava)
      setUser(user);
      setLogin(user.data.user?.user_metadata.login);
      setEmail(user.data.user?.email || 'email not found');
    })();
  }, []);

  async function sendPhoto() {
    if (ref.current && ref.current?.files) {
      let file = ref.current?.files[0];
      
      if (!user) return;

      let id = user.data.user?.id;
      let random = Math.random()*10000000;
      let newFileName = `${id}-${random}-logo${file.name.slice(file.name.lastIndexOf('.'))}`;

      await supabase.storage.from('bucket2').upload(newFileName, file).then(async () => {
        let url = supabase.storage.from('bucket2').getPublicUrl(newFileName).data.publicUrl;
        let a = await supabase.from('Users').update({ avatar_url: url }).eq('user_id', id).select();
        
        if (!a.data) return;
        
        setAvatar(a.data[0].avatar_url)
      })
    }
  }

  return (
    <>
      <h1 className="login-text">{login}</h1>
      <h3 className="email-text">{email}</h3>
      <Avatar style={{ width: "150px", height: "150px" }} onClick={() => { ref.current && ref.current.click() }} src={avatar ? avatar : Image}/>
      <input hidden ref={ref} type="file" />
      <button className="file-btn" onClick={sendPhoto} type="submit">Confirm</button>
    </>
  );
};

export default UserPage;
