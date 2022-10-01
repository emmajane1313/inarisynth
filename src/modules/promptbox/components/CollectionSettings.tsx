import { FunctionComponent } from "react";
import { CollectionSettingsProps } from "../../../types/lens/lenstypes.types";

export const CollectionSettings: FunctionComponent<CollectionSettingsProps> = ({
  collectionModule,
  setCollectionModule,
  currencies,
  referral,
  setReferral
}): JSX.Element => {
  return (
    <div className="relative -top-8 flex justify-start mb-2">
      <div id="collectionModule">
        <select
          name="collect"
          id="collect"
          defaultValue="free"
          className="relative mr-4"
          onChange={(e) => setCollectionModule(e.target.value)}
        >
          <option value="Free">Free</option>
          <option value="Revert">Revert</option>
          <option value="Fee">Fee</option>
          <option value="Limited Fee">Limited Fee</option>
          <option value="Limited Timed Fee">Limited Timed Fee</option>
          <option value="Timed Fee">Timed Fee</option>
        </select>
      </div>
      {collectionModule !== "Revert" && (
        <div id="followerOnly">
          <select
            name="follower"
            id="follower"
            defaultValue="0"
            className="relative mr-4"
          >
            <option value="0" disabled>
              Only Followers
            </option>
            <option value="False">False</option>
            <option value="True">True</option>
          </select>
        </div>
      )}
      {collectionModule !== "Free" &&
      collectionModule !== "Revert" &&
      collectionModule !== undefined ? (
        <div className="relative flex">
          <div id="currencyModule" className="relative m-0 justify-start">
            <select name="currency" id="currency" className="relative mr-4">
              {currencies?.map((currency, index) => {
                return (
                  <option key={index} value={currency.address}>
                    {currency.symbol}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="mr-1 top-0.5 relative">$</p>
          <input
            type="number"
            id="valueAmount"
            name="valueAmount"
            min="0"
            required
            step="0.00001"
            defaultValue="1"
            className="relative mr-4 w-16 pl-1"
          />
          <div className="flex">
            <div className="relative mr-3 w-fit text-offBlack">{`Referral Fee: ${Number(
              referral
            ).toFixed(2)}%`}</div>
            <input
              type="number"
              id="referral"
              name="referral"
              min="0"
              max="100"
              step="0.01"
              defaultValue="0"
              className="mr-4 w-16"
              onChange={(e: any) => setReferral(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      {collectionModule == "Limited Fee" ||
      collectionModule == "Limited Timed Fee" ? (
        <div className="relative flex">
        <p className="relative mr-3 w-fit">Collect Limit: </p>
          <input
            type="number"
            id="collectLimit"
            name="collectLimit"
            min="1"
            step="1"
            className="mr-4 w-16"
            defaultValue="1"
          />
          </div>
      ) : (
        <></>
      )}
    </div>
  );
};
