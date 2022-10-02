import { FunctionComponent } from "react";
import { CollectionSettingsProps } from "../../../types/lens/lenstypes.types";

export const CollectionSettings: FunctionComponent<CollectionSettingsProps> = ({
  collectionModule,
  setCollectionModule,
  currencies,
  referral,
  setReferral,
  setChanged,
}): JSX.Element => {
  return (
    <div className="absolute -top-52 sm:-top-[10vw] md:-top-16 grid grid-flow-row auto-rows-auto justify-start">
      <div className="relative sm:flex-row mb-3 flex">
        <div id="collectionModule">
          <select
            name="collect"
            id="collect"
            defaultValue="free"
            className="relative mr-4"
            onChange={(e) => {
              setCollectionModule(e.target.value);
              setChanged(true);
            }}
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
              onChange={() => setChanged(true)}
            >
              <option value="0" disabled>
                Only Followers
              </option>
              <option value="False">False</option>
              <option value="True">True</option>
            </select>
          </div>
        )}
      </div>
      <div className="relative flex sm:flex-row sm:right-auto right-[11.6%]">
        {collectionModule !== "Free" &&
        collectionModule !== "Revert" &&
        collectionModule !== undefined ? (
          <div className="relative sm:flex">
            <div id="currencyModule" className="relative m-0 justify-start">
              <select
                name="currency"
                id="currency"
                className="relative mr-4"
                onChange={() => setChanged(true)}
              >
                {currencies?.map((currency, index) => {
                  return (
                    <option key={index} value={currency.address}>
                      {currency.symbol}
                    </option>
                  );
                })}
              </select>
            </div>
            <p className="mr-1 sm:top-0.5 relative -top-4 sm:right-auto -right-10">
              $
            </p>
            <input
              type="number"
              id="valueAmount"
              name="valueAmount"
              min="0"
              required
              step="0.00001"
              defaultValue="1"
              placeholder="1"
              className="relative mr-4 w-16 pl-1 sm:top-auto -top-8 sm:right-auto -right-[58%]"
              onChange={() => setChanged(true)}
            />
            <div className="sm:flex block">
              <div className="relative mr-3 -right-[23%] -top-4 sm:top-auto sm:right-0 text-offBlack whitespace-nowrap">{`Referral Fee: ${Number(
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
                placeholder="0%"
                className="mr-4 w-16 pl-1 -right-[104%] -top-8 sm:top-auto sm:right-0 relative"
                onChange={(e: any) => {
                  setReferral(e.target.value);
                  setChanged(true);
                }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="relative sm:flex block">
          {collectionModule == "Limited Fee" ||
          collectionModule == "Limited Timed Fee" ? (
            <div className="relative sm:flex block sm:right-auto right-10">
              <p className="relative right-[73%] sm:right-0 top-16 sm:top-auto sm:mr-3 w-fit whitespace-nowrap">
                Collect Limit:{" "}
              </p>
              <input
                type="number"
                id="collectLimit"
                name="collectLimit"
                min="1"
                step="1"
                className="mr-4 w-16 pl-1 -right-[20%] sm:right-0 top-12 sm:top-auto relative"
                defaultValue="10"
                placeholder="10"
                onChange={() => setChanged(true)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
