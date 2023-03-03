import { useState } from "react";
import AddWord from "./AddWord";
import Words from "./Words";
import { motion } from "framer-motion";
import AddWords from "./AddWords";

const WordsTab = ({ collection }) => {
  const [showComponent, setShowComponent] = useState("words");

  return (
    <div style={{ padding: "5px 0px" }}>
      <motion.div
        key={showComponent}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.4,
        }}
      >
        {showComponent === "words" ? (
          <Words setShowComponent={setShowComponent}/>
        ) : showComponent === "addWord" ? (
          <AddWord setShowComponent={setShowComponent} />
        ) : (
          <AddWords setShowComponent={setShowComponent} collection={collection}/>
        )}
      </motion.div>
    </div>
  );
};

export default WordsTab;
